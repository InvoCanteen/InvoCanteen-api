import app from "@/app";

const port = process.env.PORT || 4500;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
