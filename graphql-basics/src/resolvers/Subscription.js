const Subscription = {
  // Unlike queries and mutations, the value for count is actually not a method
  // it needs to be an object.
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0

      setInterval(() => {
        count++
        pubsub.publish('count', {
          count: count
        })
      }, 1000)

      return pubsub.asyncIterator('count')
    }
  }
}

export { Subscription as default }