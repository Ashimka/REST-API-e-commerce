import { unlink } from "node:fs/promises";
import { resolve } from "node:path";

class DeleteController {
  async deleteFile(req, res) {
    const fileName = req.params.name;

    try {
      await unlink(resolve(`${__basedir}/upload`, fileName));

      res.status(200).send({ message: "File is deleted!", fileName });
    } catch (error) {
      res.status(500).send({ message: `Could not delete the file. ${error}` });
    }
  }
}
export default new DeleteController();
