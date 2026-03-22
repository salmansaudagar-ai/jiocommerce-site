'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { FiUploadCloud, FiCheck, FiAlertCircle } from 'react-icons/fi';

// Note: metadata export moved to server component wrapper
export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>(
    'idle'
  );
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      setUploadStatus('error');
      setFileName(null);
      return;
    }

    setFileName(file.name);
    setUploadStatus('uploading');

    // Simulate upload
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jio-navy mb-2">Upload Content</h1>
        <p className="text-gray-600">Upload PPTX files for content processing</p>
      </div>

      {/* Upload Zone */}
      <div className="max-w-2xl">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-jio-purple bg-jio-purple/5'
              : 'border-gray-300 bg-gray-50 hover:border-jio-purple'
          }`}
        >
          <div className="mb-4 inline-block p-4 bg-jio-purple/10 rounded-full">
            <FiUploadCloud className="w-8 h-8 text-jio-purple" />
          </div>

          <h3 className="text-xl font-semibold text-jio-navy mb-2">
            Drag and drop your PPTX file
          </h3>
          <p className="text-gray-600 mb-6">or</p>

          <label>
            <input
              type="file"
              accept=".pptx"
              onChange={handleFileInput}
              className="hidden"
            />
            <button
              onClick={() => {}}
              className="px-6 py-3 bg-jio-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all cursor-pointer"
            >
              Browse Files
            </button>
          </label>

          <p className="text-xs text-gray-500 mt-4">Max file size: 50MB. Supported: PPTX</p>
        </div>

        {/* Status */}
        {uploadStatus !== 'idle' && (
          <div className="mt-8">
            {uploadStatus === 'uploading' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="font-semibold text-blue-900">Uploading {fileName}...</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <FiCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Upload successful!</p>
                    <p className="text-sm text-green-700">{fileName} has been queued for processing</p>
                  </div>
                </div>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-900">Upload failed</p>
                    <p className="text-sm text-red-700">Please upload a valid PPTX file</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-jio-navy mb-2">Supported Format</h4>
          <p className="text-sm text-gray-600">PowerPoint presentations (.pptx) only</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-jio-navy mb-2">File Size</h4>
          <p className="text-sm text-gray-600">Maximum 50MB per file</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-jio-navy mb-2">Processing</h4>
          <p className="text-sm text-gray-600">Files are processed within minutes</p>
        </div>
      </div>
    </>
  );
}
