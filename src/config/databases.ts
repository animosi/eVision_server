import * as mongoose from 'mongoose';

export default (database: string) => {
  const connect = async () => {
    try {
      await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      return console.log('Mongodb connected!', database);
    } catch (err) {
      console.log('Error connecting to database: ', err);
      return process.exit(1);
    }
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
