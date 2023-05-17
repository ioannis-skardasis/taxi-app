import React, { useState } from "react";
import "./Faq.css";

function Faq() {
  const faqData = [
    {
      question: "What is Taxi Treasures?",
      answer:
        "Taxi Treasures is a web application designed to connect people who have lost or found items in taxi cabs. It serves as a platform for users to report lost items and for those who have found items to publish their discovery, facilitating the process of reuniting lost belongings with their owners.",
    },
    {
      question: "How does Taxi Treasures work?",
      answer:
        "If you have lost an item inside a taxi cab, you can use Taxi Treasures to publish details about the item, such as its description, the location where you lost it, and the car model of the taxi. By doing so, if someone finds your item, they can reach out to you through the platform and arrange for its return.",
    },
    {
      question: "What information should I include when reporting a lost item?",
      answer:
        "When reporting a lost item on Taxi Treasures, it is important to provide a detailed description of the item to help others identify it. Additionally, provide the location where you lost it, including any relevant landmarks or addresses, and the model of the taxi cab you were in.",
    },
    {
      question:
        "I found an item in a taxi cab. How can I use Taxi Treasures to return it to its owner?",
      answer:
        "If you have found an item in a taxi cab, you can publish its details on Taxi Treasures. Include a description of the item, the location where you found it, and any other relevant information. The owner of the item can then reach out to you through the platform to arrange for its return.",
    },
    {
      question: "Is there a fee for using Taxi Treasures?",
      answer:
        "No, Taxi Treasures is a free-to-use web application. There are no fees associated with reporting lost items or publishing found items. Our aim is to facilitate the return of lost belongings and promote goodwill among users.",
    },
    {
      question:
        "What if I recover my lost item after reporting it on Taxi Treasures?",
      answer:
        "If you manage to recover your lost item after publishing it on Taxi Treasures, we kindly request that you delete it from the platform.",
    },
    {
      question: "What if I can't find my lost item on Taxi Treasures?",
      answer:
        "If you cannot find your lost item listed on Taxi Treasures, don't lose hope. New found items are continuously being added to the platform, so it's important to regularly check for updates. Additionally, you can consider reaching out to local taxi companies or authorities to inquire about any lost and found items that match your description.",
    },
    {
      question: "Is my personal information safe when using Taxi Treasures?",
      answer:
        "Taxi Treasures takes privacy and data security seriously. Your personal information is protected and will not be shared with third parties without your consent. However, when communicating with other users about lost or found items, exercise caution and avoid sharing sensitive personal details until you are confident in the legitimacy of the interaction.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions (FAQ)</h2>
      <br />
      <br />
      <br />
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className={`faq-question ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <strong>{faq.question}</strong>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
