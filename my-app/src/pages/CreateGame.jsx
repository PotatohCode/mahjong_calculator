import { useState, useEffect } from "react";
import {
    Box, TextField, Button,
    FormGroup, FormControl, FormControlLabel, InputLabel, Select, MenuItem, Checkbox
} from "@mui/material";
import { listPlayers } from "../api.js";

export default function CreateGame() {
    const [form, setForm] = useState({
        name: "",
        dong: "",
        nan: "",
        xi: "",
        bei: "",
        amt_playing: 0,
        shooter: true
    });
    const [g_players, setGPlayers] = useState([]);
    const [submitted, setSubmitted] = useState(null);

    // GET
    const reload = async (results) => setGPlayers(await listPlayers());
    useEffect(() => {
        reload();
    }, []);

    const onChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((f) => ({ ...f, shooter: type === "checkbox" ? checked : value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(form);
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
                name="amt"
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

            <Button type="submit" variant="contained">Submit</Button>

            {submitted && (
                <p>
                    Points: <b>{points}</b><br></br>
                    Payout: <b>{payout}</b>
                </p>
            )}
        </Box>
    );
}
