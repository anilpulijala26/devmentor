interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title = "Video" }: YouTubeEmbedProps) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&iv_load_policy=3&fs=0`;

  return (
    <div className="my-6 aspect-video rounded-lg overflow-hidden border border-slate-200 relative">
      <iframe
        className="w-full h-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        allowFullScreen
      ></iframe>
      {/* Solid overlay blocking top-right copy link button */}
      <div className="absolute top-0 right-0 w-32 h-16 bg-slate-50 z-20"></div>
      {/* Solid overlay blocking bottom-left 'Watch on YouTube' button */}
      <div className="absolute bottom-0 left-0 w-40 h-16 bg-slate-50 z-20"></div>
    </div>
  );
}
