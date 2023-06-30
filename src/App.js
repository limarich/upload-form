import React, { useState, useRef, useEffect } from "react";
import { ImageModal } from "./components/ImageModal";
import "./styles.css";

const URL =
  "https://pantanalroots.com.br/wp-content/uploads/2016/12/macaco-voador.jpg";

export function App(props) {
  const [files, setFiles] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);
  const inputRef = useRef();

  // useEffect(() => {
  //   setShowModal(true)
  // }, [imageToEdit])

  const handleDrop = (event) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const totalFiles = [...Array.from(files || []), ...Array.from(newFiles)];
    if (totalFiles.length > 3) {
      alert("Você pode selecionar no máximo 3 arquivos.");
    } else {
      setFiles(totalFiles);
    }
  };
  const handleRemoveImg = (id) => {
    setFiles(
      Array.from(files).filter((_, index) => {
        return index !== id;
      })
    );
  };
  const getObjectURL = (file) => {
    if (window.URL && window.URL.createObjectURL) {
      return window.URL.createObjectURL(file);
    } else {
      return "";
    }
  };
  return (
    <div className="App">
      <ImageModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        files={files}
        imageToEdit={imageToEdit}
      />
      <div
        className="drop-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h1>Arraste seus arquivos aqui</h1>
        <h2>Ou</h2>
        <button onClick={() => inputRef.current.click()}>
          Selecione o arquivo
        </button>
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
          ref={inputRef}
          hidden
        />
      </div>
      {files && (
        <>
          <ul className="preview-container">
            {Array.from(files).map((item, index) => (
              <button
                style={{
                  all: "unset"
                }}
                onClick={() => {
                  setImageToEdit(index);
                  setShowModal(true);
                }}
              >
                <li key={index}>
                  <img src={getObjectURL(item)} alt={item.name} />{" "}
                  <button onClick={() => handleRemoveImg(index)}>X</button>
                </li>
              </button>
            ))}
          </ul>
          <div className="action-container">
            <button onClick={() => setFiles(null)}>limpar</button>
            <button onClick={() => {}}>enviar</button>
          </div>
        </>
      )}
    </div>
  );
}
