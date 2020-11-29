import NewsLetter from "../../model/NewsLetter";

class NewsLetterController {
  static async subscribe(req, res) {
    try {
      const { email } = req.body;
      const subscribed = await NewsLetter.findOne({ email: email });
      if (subscribed) {
        res.status(400).json({ error: "You've already subscribed" });
      }
      const subscriber = new NewsLetter({
        email: email,
      });
      await subscriber.save();
      res.status(201).json({
        msg: "Subscribed",
        subscriber: { email: email, createdAt: Date.now },
      });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong" });
    }
  }
  static async unsubscribe(req, res) {
    try {
      const { email } = req.params;
      const subscribed = await NewsLetter.findOne({ email: email });
      if (!subscribed) {
        res.status(400).json({ error: "You've not subscribed" });
      }
      const unsubscribe = await NewsLetter.deleteOne(subscribed);
      res
        .status(201)
        .json({ msg: "Unsubscribed successfuly", unsubscriber: subscribed });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong, try again" });
    }
  }
}

export default NewsLetterController;
