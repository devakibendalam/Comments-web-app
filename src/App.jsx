import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "./features/userSlice";
import LoginForm from "./components/LoginForm";
import CommentList from "./components/CommentList";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    InputBase,
    IconButton,
    ThemeProvider,
    createTheme,
    CssBaseline,
    CircularProgress,
} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function App() {
    const {isLoggedIn, userData, status} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", newDarkMode.toString());
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                        <CommentIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Comment App
                        </Typography>
                        {isLoggedIn && (
                            <>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{"aria-label": "search"}}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </Search>
                                <Avatar
                                    src={userData.avatar}
                                    alt={userData.name}
                                    sx={{marginRight: 1}}
                                />
                                <Typography variant="subtitle1" sx={{marginRight: 2}}>
                                    {userData.name}
                                </Typography>
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        )}
                        <IconButton sx={{ml: 1}} onClick={toggleDarkMode} color="inherit">
                            {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className="main-content">
                    {status === "loading" ? (
                        <CircularProgress className="loading-spinner"/>
                    ) : !isLoggedIn ? (
                        <LoginForm/>
                    ) : (
                        <CommentList searchTerm={searchTerm}/>
                    )}
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;