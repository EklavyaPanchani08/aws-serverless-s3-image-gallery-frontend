const ImageGallery = ({images,handleDelete}) => {

  return (
    <div className="gallery">
      {images.map((image) => (
        <div className="gallery-item" key={image.key}>
          <img src={image.url} alt="Uploaded" />
          <button className="delete-button" onClick={() => handleDelete(image.key)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
