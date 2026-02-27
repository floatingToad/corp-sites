import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon, DownloadIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [filesFolder1, setFilesFolder1] = useState([]);
    const [filesFolder2, setFilesFolder2] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!storedUser || !token) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
            fetchFiles('folder1', setFilesFolder1);
            fetchFiles('folder2', setFilesFolder2);
        }
    }, [navigate]);

    const fetchFiles = async (folder, setFiles) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/files/list?folder=${folder}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.files) setFiles(data.files);
        } catch (err) {
            console.error("Failed to fetch files", err);
        }
    };

    const handleDownload = async (key, callback) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/files/url?key=${encodeURIComponent(key)}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.url) {
                if (callback) {
                    callback(data.url);
                } else {
                    window.open(data.url, '_blank');
                }
            }
        } catch (err) {
            console.error("Failed to get download URL", err);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Project Dev SCSU</h1>
                        <p className="text-muted-foreground">Welcome back, {user.full_name || user.username}.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </header>

                <Tabs defaultValue="folder1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="folder1">Client Docs A</TabsTrigger>
                        <TabsTrigger value="folder2">Client Docs B</TabsTrigger>
                    </TabsList>
                    <TabsContent value="folder1">
                        <FileList folder="folder1" files={filesFolder1} onDownload={handleDownload} />
                    </TabsContent>
                    <TabsContent value="folder2">
                        <FileList folder="folder2" files={filesFolder2} onDownload={handleDownload} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}


function FileList({ folder, files, onDownload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const placeholdersA = [
        { key: 'cat1', name: 'Bella', url: 'https://placecats.com/300/200?fit=contain&position=center' },
        { key: 'cat2', name: 'Charlie', url: 'https://placecats.com/neo/300/200?fit=contain&position=center' },
        { key: 'cat3', name: 'Luna', url: 'https://placecats.com/millie/300/200?fit=contain&position=center' },
        { key: 'cat4', name: 'Lucy', url: 'https://placecats.com/louie/300/200?fit=contain&position=center' },
    ];

    const placeholdersB = [
        { key: 'cat5', name: 'Oscar', url: 'https://placecats.com/g/300/200?fit=contain&position=center' },  // Grayscale
        { key: 'cat6', name: 'Simba', url: 'https://placecats.com/bella/300/200?fit=contain&position=center' },
        { key: 'cat7', name: 'Milo', url: 'https://placecats.com/poppy/300/200?fit=contain&position=center' },
        { key: 'cat8', name: 'Max', url: 'https://placecats.com/301/201?fit=contain&position=center' },      // Slightly diff size
    ];

    const displayFiles = files.length > 0 ? files : (folder === 'folder1' ? placeholdersA : placeholdersB);

    const handleView = (file) => {
        if (file.url) {
            setSelectedFile(file);
        } else {
            onDownload(file.key, (url) => setSelectedFile({ ...file, url }));
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayFiles.map((file, index) => (
                    <Card key={file.key || index} className="overflow-hidden group cursor-pointer" onClick={() => handleView(file)}>
                        <CardContent className="p-0">
                            <div className="h-48 w-full bg-slate-100 relative">
                                <img
                                    src={file.url || `https://placecats.com/${300 + index}/${200 + index}?fit=contain&position=center`}
                                    alt={file.name}
                                    className="h-full w-full object-contain transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <span className="font-medium text-sm truncate">{file.name}</span>
                                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleView(file); }}>
                                    <DownloadIcon className="h-4 w-4 mr-2" />
                                    View
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
                <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col p-0 overflow-hidden bg-black/95 border-none">
                    <DialogHeader className="absolute top-4 left-4 z-50 text-white">
                        <DialogTitle>{selectedFile?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 flex items-center justify-center p-4">
                        {selectedFile && (
                            <img
                                src={selectedFile.url}
                                alt={selectedFile.name}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                    <div className="p-4 bg-white/5 backdrop-blur flex justify-end">
                        <Button variant="secondary" onClick={() => window.open(selectedFile?.url, '_blank')}>
                            Download Original
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
