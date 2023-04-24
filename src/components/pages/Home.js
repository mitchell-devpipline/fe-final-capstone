import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

export default function Home() {
  const images = [
    {
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/213/532575.jpg",
    },
    {
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/164/412464.jpg",
    },
    {
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/419/1049994.jpg",
    },
  ];
  return (
    <div className="home">
      <h1>Welcome to My Final FE Capstone</h1>
      <h2>Get ready to see wonders! </h2>
      <p> Navigate through the app using the Navbar above and enjoy!</p>
      <p>
        I dont really watch TV but here are some shows that looked interesting
        to me!
      </p>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
      />
    </div>
  );
}
