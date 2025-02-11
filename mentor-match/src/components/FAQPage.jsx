import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What is Mentor Map?',
      answer: 'Mentor Map is a platform that connects mentors and students for guidance and learning.',
    },
    {
      question: 'How do I sign up as a mentor?',
      answer:
        'Click on the Signup button in the navigation bar and select "Mentor" as your role. Fill in the required details to create your account.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'You can reach out to us through the Contact Us page or email us at support@mentormatch.com.',
    },
  ];

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions (FAQ)
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQPage;
