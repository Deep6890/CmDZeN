import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../src/components/PreBuildComponts/navBar';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';

/**
 * NotesPage Component - Distraction-free writing environment
 * 
 * Features:
 * - Rich text editor with customizable formatting
 * - Font family, size, and color selection
 * - Real-time word and character count
 * - Export to Microsoft Word (.doc) format
 * - Responsive design for all devices
 */
export default function NotesPage() {
  const navigate = useNavigate(); // Navigation hook for routing
  
  // Writing content state
  const [content, setContent] = useState(''); // Main text content
  const [title, setTitle] = useState('My Notes'); // Document title
  
  // Formatting options state
  const [fontSize, setFontSize] = useState(16); // Text size in pixels
  const [fontFamily, setFontFamily] = useState('Arial'); // Font family selection
  const [textColor, setTextColor] = useState('#000000'); // Text color hex value

  /**
   * Export content to Microsoft Word format
   * Creates downloadable .doc file with formatting
   */
  const exportToWord = () => {
    // Create HTML document with Word-compatible formatting
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${title}</title></head>
      <body style="font-family: ${fontFamily}; font-size: ${fontSize}px; color: ${textColor};">
        <h1>${title}</h1>
        <div>${content.replace(/\n/g, '<br>')}</div>
      </body></html>`;
    
    // Create downloadable blob and trigger download
    const blob = new Blob([header], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.doc`; // Set filename
    link.click(); // Trigger download
    URL.revokeObjectURL(url); // Clean up memory
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <LenisScroll>
        <NavBar />
        
        <section className="w-full pt-20 pb-8 px-6">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => navigate('/home')}
              className="mb-6 text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center gap-2"
            >
              ← Back to Home
            </button>
            
            <h1 className="text-4xl text-gray-800 mb-8 text-center">Writing Environment</h1>
            
            {/* Controls */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                    <option value={18}>18px</option>
                    <option value={20}>20px</option>
                    <option value={24}>24px</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
              
              <button
                onClick={exportToWord}
                disabled={!content.trim()}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  content.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                📄 Export to Word
              </button>
            </div>
            
            {/* Writing Area */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts, ideas, or notes here..."
                className="w-full h-96 p-6 resize-none focus:outline-none"
                style={{
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  lineHeight: '1.6'
                }}
              />
              
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Words: {content.trim().split(/\s+/).filter(word => word.length > 0).length} | 
                Characters: {content.length}
              </div>
            </div>
          </div>
        </section>
      </LenisScroll>
    </div>
  );
}