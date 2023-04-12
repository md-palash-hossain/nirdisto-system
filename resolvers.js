const { PubSub, withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

module.exports = {
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([MESSAGE_ADDED]),
        (payload, variables) => {
          return payload.messageAdded.projectId.toString() === variables.projectId;
        }
      )
    },
  },

  Mutation: {
    async addMessage(parent, { input }, { currentUser }) {
      // create a new message in the database
      const message = await Message.create({
        projectId: input.projectId,
        sender: currentUser._id,
        body: input.body,
      });

      // publish the new message to the subscribers
      pubsub.publish(MESSAGE_ADDED, { messageAdded: message });

      return message;
    },
  },
};
