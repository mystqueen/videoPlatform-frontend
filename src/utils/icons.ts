function getIconUrl(fileUrl: string): string {
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
        'png': 'jpg.png',
        'link': 'link.png',
        'pdf': 'pdf.png',
        'ppt': 'ppt.png',
        'pptx': 'ppt.png',
        'psd': 'psd.png',
        'svg': 'svg.png',
        'txt': 'txt.png',
        'mp4': 'video.png',
        'avi': 'video.png',
        'mov': 'video.png',
        'doc': 'word.png',
        'docx': 'word.png'
    };

    const parts = fileUrl.split('.');
    const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';

    const iconFileName = extension && iconMapping[extension] ? iconMapping[extension] : 'unknown.png';

    return `/files/icons/${iconFileName}`;
}


export default getIconUrl