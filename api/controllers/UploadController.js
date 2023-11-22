class UploadController {
  createFile(req, res) {
    try {
      if (req.file) {
        return res.json({
          url: `/${req.file.filename}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UploadController();
