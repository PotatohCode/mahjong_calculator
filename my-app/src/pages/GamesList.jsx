import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Container, Grid, Card, CardActionArea, CardContent, CardHeader,
    Chip, Stack, Typography, Skeleton
} from "@mui/material";
import { listGames } from "../api.js";

export default function Games() {
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
    const [error, setError] = useState(null);

    const reload = async () => setRows(await listGames()); // GET
    useEffect(() => {
        reload();
    }, []);

    if (status === "loading") {
        return (
            <Container sx={{ py: 3 }}>
                <Grid container spacing={2}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardHeader title={<Skeleton width="60%" />} subheader={<Skeleton width="40%" />} />
                                <CardContent>
                                    <Skeleton height={18} sx={{ mb: 1 }} />
                                    <Skeleton height={18} sx={{ mb: 1 }} />
                                    <Skeleton variant="rectangular" height={28} width={120} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    if (status === "error") {
        return (
            <Container sx={{ py: 3 }}>
                <Typography color="error">Failed to load games: {String(error?.message || error)}</Typography>
            </Container>
        );
    }

    if (rows.length === 0) {
        return (
            <Container sx={{ py: 3 }}>
                <Typography variant="h6">No games yet</Typography>
                <Typography variant="body2" color="text.secondary">
                    Create a game to see it here.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Games</Typography>
            <Grid container spacing={2}>
                {rows.map((g) => (
                    <Grid key={g.id} item xs={12} sm={6} md={4}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1, "&:hover": { boxShadow: 3 } }}>
                            <CardActionArea component={RouterLink} to={`/games/${g.id}`}>
                                <CardHeader
                                    title={`${g.name}`}
                                    sx={{ pb: 0.5 }}
                                />
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Winner: {Array.isArray(g.players) ? Math.max(g.dong.payout, g.nan.payout, g.xi.payout, g.nan.payout) : 0}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Rounds: {Array.isArray(g.rounds) ? g.rounds.length : 0}
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                            {g.shooter ? <Chip size="small" label="Shooter" color="primary" /> : null}
                                            {g.amt_playing != null ? (
                                                <Chip size="small" variant="outlined" label={`Amt: ${g.amt_playing}`} />
                                            ) : null}
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}