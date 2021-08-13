import NewsLetter from "../../model/NewsLetter";

class NewsLetterController {
  static async subscribe(req, res) {
    try {
      const { email } = req.body;
      const subscribed = await NewsLetter.findOne({ email: email });
      if (subscribed) {
        return res.status(400).json({ error: "You've already subscribed" });
      }
      const subscriber = new NewsLetter({
        email: email,
      });
      await subscriber.save();
      return res.status(201).json({
        msg: "Subscribed successfuly",
        subscriber: { email: email, createdAt: Date.now },
      });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
  static async unsubscribe(req, res) {
    try {
      const { email } = req.params;
      const subscribed = await NewsLetter.findOne({ email: email });
      if (!subscribed) {
        return res.status(400).json({ error: "You've not subscribed" });
      }
      await NewsLetter.deleteOne(subscribed);
      return res
        .status(201)
        .json({ msg: "Unsubscribed successfuly", unsubscriber: subscribed });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong, try again" });
    }
  }
  static async getSubscribers(req, res) {
    try {
      const subscribers = await NewsLetter.find({});
      return res.status(200).json({
        msg: "Subscribers fetched succcsfuly",
        subscribers: subscribers,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async getSubscriber(req, res) {
    try {
      const { email } = req.params;
      const subscriber = await NewsLetter.findOne({ email: email });
      if (!subscriber) {
        return res.status(404).json({ error: "Subscriber not found" });
      }
      return res.status(200).json({
        msg: "Subscriber fetched succcsfuly",
        subscriber: subscriber,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Something went wrong", err: error });
    }
  }
}

export default NewsLetterController;
