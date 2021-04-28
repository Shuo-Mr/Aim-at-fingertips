export default (req, res) => {
    const email = req.body.email
    res.status(200).json({ text: 'Hello' })
}