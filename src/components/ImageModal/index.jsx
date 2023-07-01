import "./styles.css";
export const ImageModal = ({ showModal, onClose, files, imageToEdit }) => {
  const getObjectURL = (file) => {
    if (window.URL && window.URL.createObjectURL && file) {
      return window.URL.createObjectURL(file);
    } else {
      return "";
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="modal">
            <h1>Editar imagem</h1>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
            <div className="image-container">
              <img
                src={getObjectURL(files[imageToEdit])}
                alt={files[imageToEdit]?.name || "não informado"}
              />
            </div>
            <div className="input-control">
              <label htmlFor="comment">Observações</label>
              <textarea
                name="comment"
                placeholder="Informe aqui alguma observação. Este campo é opcional"
              />
            </div>
            <button className="save-btn" onClick={onClose}>
              Salvar
            </button>
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
};
