import React, { useRef, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import jsPDF from "jspdf";
import certificate from "../assets/appreciation.jpeg";

function Appreciation() {
  const [name, setName] = useState("");
  const [namePrefix, setNamePrefix] = useState("Mr");
  const [imagePreview, setImagePreview] = useState(null);

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
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      orientation: "landscape",
    });

    // Calculate the position to center the certificate image
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const certificateWidth = 567; // Width of the certificate image
    const certificateHeight = 400; // Height of the certificate image
    const x = (pageWidth - certificateWidth) / 2;
    const y = (pageHeight - certificateHeight) / 2;

    // Add the certificate image to the PDF at the calculated position
    doc.addImage(
      certificate,
      "JPEG",
      x,
      y,
      certificateWidth,
      certificateHeight
    );

    // Add name with styling
    const nameText = `${namePrefix}. ${name}`;
    const nameWidth = doc.getStringUnitWidth(nameText) * 5; // Approximate width
    const nameX = (certificateWidth - nameWidth) / 2.3 + x; // Adjust X position to center within certificate
    const nameY = y + certificateHeight * 0.56; // Adjust Y position as needed
    doc.setFont("Poppins", "bold"); // Set font and font style
    doc.setFontSize(20); // Set font size
    doc.setTextColor("#e6ae2e"); // Set text color
    doc.text(nameText, nameX, nameY);

    // Add image preview
    if (imagePreview) {
      const imageWidth = 90;
      const imageHeight = 90;
      const imageX = certificateWidth * 0.57 + x; // Adjust X position to center within certificate
      const imageY = y + certificateHeight * 0.62; // Adjust Y position as needed
      doc.addImage(
        imagePreview,
        "JPEG",
        imageX,
        imageY,
        imageWidth,
        imageHeight
      );
    }

    // Save the document
    doc.save("document.pdf");
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
                  <DropdownButton
                    variant="outline-secondary"
                    title={namePrefix}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item onClick={() => setNamePrefix("Mr")}>
                      Mr
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setNamePrefix("Mrs")}>
                      Mrs
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setNamePrefix("Ms")}>
                      Ms
                    </Dropdown.Item>
                  </DropdownButton>
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
              <Button onClick={handleSubmit} className="mt-2">
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="col-11 col-lg-6">
          <div
            style={{ margin: "auto" }}
            className="position-relative appreciationContainer"
            ref={appreciationContainerRef}
          >
            <img
              className="appreciationCertificate"
              src={certificate}
              alt="preview"
            />
            {name.length ? (
              <div className="appreciatorName fw-medium">
                {namePrefix + ". " + name}
              </div>
            ) : (
              ""
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="appreciatorImage"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appreciation;
