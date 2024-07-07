function getIconUrl(fileUrl: string): string {
    // Define a mapping between file extensions and icon file names
    const iconMapping: { [key: string]: string } = {
        'ai': 'ai.png',
        'mp3': 'audio.png',
        'link': 'link.png',
        'unknown': 'unknown.png',
        'mp4': 'video.png',
        'avi': 'video.png',
        'mov': 'video.png',

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
console.log(getIconUrl(fileUrl));
