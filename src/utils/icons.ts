function getIconUrl(fileUrl: string): string {
    const iconMapping: { [key: string]: string } = {
        'ai': 'ai.png',
        'mp3': 'audio.png',
        'zip': 'compressed.png',
        'rar': 'compressed.png',
        'link': 'link.png',
        'unknown': 'unknown.png',
        'mp4': 'video.png',
        'avi': 'video.png',
        'mov': 'video.png',
    };

    const parts = fileUrl.split('.');
    const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';

    const iconFileName = extension && iconMapping[extension] ? iconMapping[extension] : 'unknown.png';

    return `/files/icons/${iconFileName}`;
}


export default getIconUrl