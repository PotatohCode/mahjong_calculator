import { useState, useEffect } from "react";
import {
    Box, TextField, Button,
    FormGroup, FormControl, FormControlLabel, InputLabel, Select, MenuItem, Checkbox
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { listPlayers, createGame } from "../api.js";

export default function CreateGame() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        dong: "",
        nan: "",
        xi: "",
        bei: "",
        amt_playing: 0,
        shooter: true
    });
    const [g_players, setGPlayers] = useState([]); // list of all players
    const [error, setError] = useState(false);

    const reload = async () => setGPlayers(await listPlayers()); // GET
    useEffect(() => {
        reload();
    }, []);

    const onChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.name.length == 0 || form.dong.length == 0 || form.nan.length == 0 || form.xi.length == 0 || form.bei.length == 0) {
            setError(true)
        } else {
            const payload = {
                name: form.name,
                total_games: 0,
                amt_playing: form.amt_playing,
                shooter: form.shooter,
                rounds: [],
                dong: {
                    player: form.dong,
                    wins: 0,
                    mantai: 0,
                    zhimo: 0,
                    shoot: 0,
                    t_shoot_cost: 0,
                    tai: 0,
                    placement: 1,
                    payout: 0
                },
                nan: {
                    player: form.nan,
                    wins: 0,
                    mantai: 0,
                    zhimo: 0,
                    shoot: 0,
                    t_shoot_cost: 0,
                    tai: 0,
                    placement: 1,
                    payout: 0
                },
                xi: {
                    player: form.xi,
                    wins: 0,
                    mantai: 0,
                    zhimo: 0,
                    shoot: 0,
                    t_shoot_cost: 0,
                    tai: 0,
                    placement: 1,
                    payout: 0
                },
                bei: {
                    player: form.bei,
                    wins: 0,
                    mantai: 0,
                    zhimo: 0,
                    shoot: 0,
                    t_shoot_cost: 0,
                    tai: 0,
                    placement: 1,
                    payout: 0
                }
            }
            const res = await createGame(payload) // POST
            if (res == null) setError(true)
            else navigate("/")
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ p: 3, display: "grid", gap: 2, width: 400, px: [1, 2, 3] }}>
            <TextField
                label="Game Name"
                name="name"
                value={form.name}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="Amt Playing"
                name="amt_playing"
                value={form.amt_playing}
                onChange={onChange}
                fullWidth
                required
            />

            <FormGroup>
                <FormControlLabel control={<Checkbox name="shooter" checked={form.shooter} onChange={onChange} />} label="Shooter" />
            </FormGroup>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="dong-select-label">Player 1 (Dong)</InputLabel>
                <Select
                    labelId="dong-select-label"
                    id="dong-select"
                    name="dong"
                    value={form.dong}
                    label="Age"
                    onChange={onChange}
                >
                    {g_players.length === 0 ? (
                        <MenuItem disabled>No options</MenuItem>
                    ) : (
                        g_players.map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                                {row.player}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="nan-select-label">Player 2 (Nan)</InputLabel>
                <Select
                    labelId="nan-select-label"
                    id="nan-select"
                    name="nan"
                    value={form.nan}
                    label="Age"
                    onChange={onChange}
                >
                    {g_players.length === 0 ? (
                        <MenuItem disabled>No options</MenuItem>
                    ) : (
                        g_players.map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                                {row.player}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="xi-select-label">Player 3 (Xi)</InputLabel>
                <Select
                    labelId="xi-select-label"
                    id="xi-select"
                    name="xi"
                    value={form.xi}
                    label="Age"
                    onChange={onChange}
                >
                    {g_players.length === 0 ? (
                        <MenuItem disabled>No options</MenuItem>
                    ) : (
                        g_players.map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                                {row.player}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="bei-select-label">Player 4 (Bei)</InputLabel>
                <Select
                    labelId="bei-select-label"
                    id="bei-select"
                    name="bei"
                    value={form.bei}
                    label="Age"
                    onChange={onChange}
                >
                    {g_players.length === 0 ? (
                        <MenuItem disabled>No options</MenuItem>
                    ) : (
                        g_players.map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                                {row.player}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            {error ? (<p>Error</p>) : <></>}

            <Button type="submit" variant="contained">Submit</Button>
            <Link to={"/"}>
                <Button>Cancel</Button>
            </Link>
        </Box>
    );
};