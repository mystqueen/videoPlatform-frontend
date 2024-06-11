function getIconUrl(fileUrl: string): string {
    // Define a mapping between file extensions and icon file names
    const iconMapping: { [key: string]: string } = {
        'ai': 'ai.png',
        'mp3': 'audio.png',
        'zip': 'compressed.png',
        'rar': 'compressed.png',
        'xls': 'excel.png',
        'xlsx': 'excel.png',
        'gif': 'gif.png',
        'html': 'html.png',
        'htm': 'html.png',
        'jpg': 'jpg.png',
        'jpeg': 'jpg.png',
        'png': 'jpg.png',  // Assuming png uses the same icon as jpg
        'link': 'link.png',
        'pdf': 'pdf.png',
        'ppt': 'ppt.png',
        'pptx': 'ppt.png',
        'psd': 'psd.png',
        'svg': 'svg.png',
        'txt': 'txt.png',
        'unknown': 'unknown.png',
        'mp4': 'video.png',
        'avi': 'video.png',
        'mov': 'video.png',
        'doc': 'word.png',
        'docx': 'word.png'
    };

    // Extract the file extension from the URL
    const parts = fileUrl.split('.');
    const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';

    // Determine the icon file name based on the extension
    const iconFileName = extension && iconMapping[extension] ? iconMapping[extension] : 'unknown.png';

    // Return the full path to the icon
    return `/assets/icons/${iconFileName}`;
}

// Example usage:
const fileUrl = 'http://example.com/document.backup.pdf';
console.log(getIconUrl(fileUrl));  // Output: /assets/icons/pdf.png
