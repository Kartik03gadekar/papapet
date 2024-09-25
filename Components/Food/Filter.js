"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled(({ title }) => (
  <>
    <div className="flex items-center w-full justify-between px-2">
      <MuiAccordionSummary
        sx={{
          width: "100%",
          display: "flex",
          gap: "2px",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex items-center justify-center"
        style={{
          width: "100%",
          display: "flex",
          gap: "2px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>{title}</Typography> {/* Render children directly */}
        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
      </MuiAccordionSummary>
    </div>
  </>
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "0px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({data}) {
  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {data?.map((i, index) => (
        <Accordion
        className="border-none"
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            title={i?.type}
            aria-controls={`panel${index + 1}d-content`}
            id="panel1d-header"
          >
            <Typography>{i?.type}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="w-full flex flex-col pl-2 gap-2 items-start justify-start">
              {i?.dets?.map((d, ind) => (
                <Typography
                  key={ind}
                  className="flex items-center gap-2 justify-start"
                >
                  <input type="checkbox" className="checkbox" /> {d}
                </Typography>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
