type YouTubeEmbedProps = {
    src: string;
  };
  
  export const YouTubeEmbed = ({ src }: YouTubeEmbedProps) => {
    return (
      <iframe
        className="w-full xl:h-[500px] lg:h-[400px] h-[300px] rounded-lg shadow-lg"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };
  