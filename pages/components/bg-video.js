
const BackgroundVideo = () => {
  return (
    <video autoPlay muted loop className="card-video">
      <source src="/videos/High defensive line, pressing.mp4" type="video/mp4" />
      {/* Add additional <source> elements for other video formats (e.g. WebM, Ogg) */}
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
