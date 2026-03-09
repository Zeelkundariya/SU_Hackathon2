import React, { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const ExcelUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload/excel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setStatus({ type: 'success', message: `Import Successful: ${response.data.message}` });
            if (onUploadSuccess) onUploadSuccess();
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: err.response?.data?.error || 'Upload failed' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-slate-900 border-slate-800 p-6 rounded-3xl shadow-xl transition-all" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-xl">
                    <Upload className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-black text-white">Import Factory Data</h3>
            </div>

            <p className="text-slate-500 text-xs font-semibold mb-6 uppercase tracking-wider">
                Synchronize production metrics and inventory via Excel.
            </p>

            <div className="space-y-6">
                <div className="relative upload-dropzone rounded-2xl p-8 text-center cursor-pointer group">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center">
                        <FileText className={`w-12 h-12 mb-3 transition-colors ${file ? 'text-indigo-400' : 'text-slate-700 group-hover:text-slate-500'}`} />
                        <span className="text-sm text-slate-300 font-bold">
                            {file ? file.name : 'Choose Industrial Dataset'}
                        </span>
                        <span className="text-slate-500 text-[10px] mt-2 font-black uppercase tracking-tighter">.xlsx or .xls templates</span>
                    </div>
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`btn-cyan-gradient w-full py-4 rounded-xl font-black flex items-center justify-center gap-3 uppercase tracking-widest text-xs transition-all ${!file || uploading ? '' : 'hover:scale-[1.02]'}`}
                >
                    {uploading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4" />
                    )}
                    {uploading ? 'Processing Hub...' : 'Sync Data Now'}
                </button>

                {status && (
                    <div className={`flex items-center gap-3 p-4 rounded-xl text-xs font-bold border animate-fade-in ${status.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}>
                        {status.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                        <span>{status.message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExcelUpload;
