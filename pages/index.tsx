import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Style from '../styles/image.module.css';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import Head from 'next/head'
import DeleteIcon from '@mui/icons-material/Delete';

import { PhotoCamera, Upload, UploadFile, CloudUpload } from '@mui/icons-material';
import { Input, Stack } from '@mui/material';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [docUrl, setDocUrl] = React.useState<string>('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        console.log('file', file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const arrayBuffer = e.target.result;
          if (arrayBuffer) {
            modifyPdf(arrayBuffer);
          }
        }

        reader.readAsArrayBuffer(file);
      }
    }
  }
  

  async function modifyPdf(existingPdfBytes: ArrayBuffer) {
    // Fetch an existing PDF document


    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()

    // Draw a string of text diagonally across the first page
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2,
      size: 12,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(0),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);
    console.log('docUrl', docUrl);
    setDocUrl(docUrl);
    // Download(pdfBytes, "application/pdf");
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <title>SmashPDF</title>
      <div className={Style.container}>
        <h1 className={Style.h1}>Easy to use Online PDF editor</h1>
        <p className={Style.p}>Edit PDF files for free. Fill & sign PDF</p>
        <img src='/smashpdfbg.jpg' alt='' />
        <Button
          className={Style.btn}
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
        >
          Upload a PDF File
          <input
            type="file"
            hidden
            onChange={onFileChange}
          />

        </Button>
        <div className={Style.li}>
          <Link href='/'><a>or start with a blank document</a></Link>
        </div>
      </div>
     

        {
          docUrl && (

            <iframe src={docUrl} width={"100%"} height={"100%"} />

          )

        }
    </div>
  );
}


