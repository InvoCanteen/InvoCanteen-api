import app, { port } from "@/app";

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});