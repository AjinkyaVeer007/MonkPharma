import React, { useRef, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import mothersDayImg from "../assets/mothersday.png";
import { relationsList } from "../utils/constant";
import html2canvas from "html2canvas";
import roseImg from "../assets/rose.png";

function MothersDayCertificate() {
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [relation, setRelation] = useState("");

  const fileInputRef = useRef(null);
  const greetingContainerRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadImage = () => {
    if (!greetingContainerRef.current) {
      return;
    }

    let container = greetingContainerRef.current;
    container.style.width = "420px";
    container.style.height = "297px";

    // Calculate width and height for A5 landscape with 10px padding
    const width = 420; // A5 landscape width in pixels (excluding padding)
    const height = 297; // A5 landscape height in pixels (excluding padding)

    // Use html2canvas to capture the greetingContainerRef element with specified options
    html2canvas(container, {
      width: width, // Add 20px for left and right padding
      height: height, // Add 20px for top and bottom padding
      useCORS: true, // Enable cross-origin resource sharing (if needed)
      scale: 8, // Scale the capture for higher resolution (optional)
    }).then((canvas) => {
      // Convert canvas to JPEG image data URL
      const imageData = canvas.toDataURL("image/jpeg", 1);

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = imageData;
      downloadLink.download = "mothers_day_greeting.jpg";
      document.body.appendChild(downloadLink);

      // Trigger the download
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);
    });
  };

  const handleSubmit = () => {
    handleDownloadImage();
  };
  return (
    <>
      <div className="text-center fw-medium h3 my-4">
        Mothers day greeting card
      </div>
      <div className="row g-0 justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="row g-0 justify-content-center">
            <div className="col-10 col-lg-8">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Name is mandatory
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Relation</Form.Label>
                <Form.Select onChange={(e) => setRelation(e.target.value)}>
                  <option value="">Open this select menu</option>
                  {relationsList &&
                    relationsList.map((rel) => (
                      <option value={rel}>{rel}</option>
                    ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Relation is mandatory
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload your image</Form.Label>
                <Form.Control
                  accept="image/*"
                  type="file"
                  placeholder="Upload your image"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <Form.Control.Feedback type="invalid">
                  Name is mandatory
                </Form.Control.Feedback>
              </Form.Group>
              <Button onClick={handleSubmit} className="mt-2">
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 my-5">
          <div
            className="shadow"
            ref={greetingContainerRef}
            style={{
              height: "297px",
              width: "420px",
              padding: "30px",
            }}
          >
            <div className="row g-0 h-100">
              <div className="col-6">
                <img
                  src={imagePreview}
                  style={{
                    height: "240px",
                    width: "170px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  alt=""
                />
              </div>
              <div className="col-6">
                <div className="text-center h-100">
                  <img width={"95px"} src={mothersDayImg} alt="img" />
                  {relation && (
                    <div
                      style={{
                        fontFamily: "Pacifico",
                        fontSize: "12px",
                      }}
                      className="fw-medium text-success mt-2"
                    >
                      {relation} you are the best! I am so lucky to have you as
                      my {relation}.
                    </div>
                  )}
                  {name && (
                    <div className="position-relative mt-2">
                      <img
                        style={{
                          position: "absolute",
                          zIndex: "1",
                        }}
                        src={roseImg}
                        alt="img"
                        width={"80px"}
                      />
                      <div
                        className="fw-bold h5 mt-5"
                        style={{
                          position: "absolute",
                          color: "#ff8e7a",
                          fontFamily: "Mochiy Pop One",
                          zIndex: "2",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        {name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MothersDayCertificate;
