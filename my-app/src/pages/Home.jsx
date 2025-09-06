import { useState } from "react";
import {
    Box, TextField, Button,
    FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox
} from "@mui/material";

export default function Home() {
    const [form, setForm] = useState({ tai: 0, amt: 0, shooter: false, touch: false });
    const [points, setPoints] = useState(0);
    const [payout, setPayout] = useState(0);
    const [submitted, setSubmitted] = useState(null);

    const onChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(form);
        setPoints((form.touch) ? 2**(form.tai-1) * form.amt * 2 : 2**(form.tai-1) * form.amt);
        setPayout(points * 4)
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ p: 3, display: "grid", gap: 2, maxWidth: 460 }}>
            <TextField
                label="Num of Tai"
                name="tai"
                value={form.tai}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="Amount Playing"
                name="amt"
                value={form.amt}
                onChange={onChange}
                fullWidth
                required
            />

            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Options</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox name="shooter" checked={form.shooter} onChange={onChange} />}
                        label="Shooter"
                    />
                    <FormControlLabel
                        control={<Checkbox name="touch" checked={form.touch} onChange={onChange} />}
                        label="Zi Mo"
                    />
                </FormGroup>
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
