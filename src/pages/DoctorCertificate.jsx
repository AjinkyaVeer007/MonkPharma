import React, { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import monkLogo from "../assets/yuki.jpeg";
import alembicLogo from "../assets/Logo.png";
import gskLogo from "../assets/gsk.png";

function DoctorCertificate() {
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSize, setImageSize] = useState(150);

  const fileInputRef = useRef(null);
  const appreciationContainerRef = useRef(null);

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

  const handleDownloadPDF = () => {
    const pdfWidth = 567;
    const pdfHeight = 400;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [pdfWidth, pdfHeight],
    });

    const appreciationContainer = appreciationContainerRef.current;

    if (appreciationContainer) {
      html2canvas(appreciationContainer, {
        scale: 2,
        useCORS: true,
        logging: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        // Calculate vertical position to center the image
        const yPos = (pdfHeight - imgHeight) / 2;

        doc.addImage(imgData, "JPEG", 0, yPos, imgWidth, imgHeight);
        doc.save("DoctorCertificate.pdf");
      });
    }
  };

  const handleSubmit = () => {
    handleDownloadPDF();
    setName("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="text-center fw-medium h3 my-4">Appreciation Form</div>
      <div className="row g-0 justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="row g-0 justify-content-center">
            <div className="col-10 col-lg-6">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Dr</InputGroup.Text>
                  <Form.Control
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Name is mandatory
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
              <Form.Group className="mb-3">
                <Form.Label>Adjust size of image</Form.Label>
                <Form.Range
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  min={120}
                  max={180}
                />
              </Form.Group>
              <Button onClick={handleSubmit} className="mt-2">
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="col-11 col-lg-6">
          <div
            style={{ margin: "auto" }}
            className="position-relative border p-2 doctorCertificate mt-5 mt-lg-0"
            ref={appreciationContainerRef}
          >
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                padding: "20px",
              }}
            >
              <img width={"100px"} src={monkLogo} alt="Monk consultancy" />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                padding: "20px",
              }}
            >
              <img width={"70px"} src={alembicLogo} alt="alembiclimited" />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                padding: "20px",
              }}
            >
              <img width={"70px"} src={gskLogo} alt="alembiclimited" />
            </div>
            <div
              style={{
                height: `${imageSize}px`,
                width: `${imageSize}px`,
                borderRadius: "50%",
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "4px solid #2169b1",
                backgroundImage: `url(${imagePreview})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            {name && (
              <div
                style={{
                  position: "absolute",
                  top: "68%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "20px",
                  color: "#f36633",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textWrap: "nowrap",
                }}
              >
                Dr. {name}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorCertificate;
