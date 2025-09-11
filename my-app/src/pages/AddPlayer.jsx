import { useState } from "react";
import {
    Box, TextField, Button,
    FormGroup, FormControlLabel, Checkbox
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { createPlayer } from "../api.js";

export default function AddPlayer() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        player: ""
    });
    const [fun, setFun] = useState(0);
    const [error, setError] = useState(false);

    const onChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (name == "18" & checked) {
            setFun(1)
        } else if (name == "18" & !checked) {
            setFun(0)
        }
        if (name == "gay" & checked) {
            setFun(2)
        } else if (name == "gay" & !checked) {
            setFun(1)
        }
        if (name == "player") {
            setForm((f) => ({ ...f, player: value }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            player: form.player,
            games: [],
            total_games: 0,
            total_payouts: 0,
            win_rate: 0,
            mantai: 0,
            zhimo: 0,
            shoot: 0,
            t_shoot_lost: 0,
            tai: 0,
            placement: 0
        }
        
        const res = await createPlayer(payload) // POST
        if (res == null) setError(true)
        else navigate("/")
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ p: 3, display: "grid", gap: 2, width: 400, px: [1, 2, 3] }}>
            <TextField
                label="Name"
                name="player"
                value={form.player}
                onChange={onChange}
                fullWidth
                required
            />

            <FormGroup>
                <FormControlLabel control={<Checkbox name="18" checked={fun > 0} onChange={onChange} />} label="Are you above 18" />
            </FormGroup>

            {
                fun > 0 ?
                <FormGroup>
                    <FormControlLabel control={<Checkbox name="gay" checked={fun == 2} onChange={onChange} />} label="Are you gay" />
                </FormGroup> : <></>
            }

            { error ? (<p>Error</p>) : <></> }

            { fun == 2 ? <Button type="submit" variant="contained">Submit</Button> : <></> }
            <Link to={"/"}>
                <Button>Cancel</Button>
            </Link>
        </Box>
    );
};