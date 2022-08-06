import React from 'react'
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

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }
  
  const drawerWidth = 240;
  const navItems = ['Menu', 'About', 'Contact'];
  
  function Download(arrayBuffer: BlobPart, type: string) {
    var blob = new Blob([arrayBuffer], { type: type });
    var url = URL.createObjectURL(blob);
    window.open(url);
  }
  export default function DrawerAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [docUrl, setDocUrl] = React.useState<string>('');
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            SmashPDF
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>


        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          SmashPDF
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >

        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ul className="flex space-x-4 font-medium">
                <li><Link href="/menu"><a>Menu</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
                <li><Link href="/contact"><a>Contact</a></Link></li>
                <li><Link href="/pricing"><a>Pricing</a></Link></li>
            </ul>
        </Box>

      </Toolbar>

    </AppBar>

    </Box>
  )
}