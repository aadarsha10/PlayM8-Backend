const organizertest = require('../models/organizer_detail_model');
constmongoose = require('mongoose');
// use the new name of the database
consturl = 'mongodb+srv://playm8:p%40ssword123@play-m8.b3c9f.mongodb.net/playM8?';
beforeAll(async () => {
    awaitmongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    awaitmongoose.connection.close();
});
describe('User Login',
    () => {
        //
        it('Add post testing',
            () => {
                const post = {
                    'writepost': 'Hi',
                    'postcomment': 'there'
                };
                return post.create(post).then((pro_ret) => {
                    expect(pro_ret.writepost).toEqual('Hi');
                });
            });
        // the code below is for delete testing
        it('to test the delete post is working or not',
            async () => {
                conststatus = awaitPost.deleteMany();
                expect(status.ok).toBe(1);
            });
        it('to test the update',
            async () => {
                returnPost.findOneAndUpdate
                    ({ _id: Object('607ea239689e893a8c6d44cd') },
                        { $set: { writepost: 'shyam' } }).then((pp) => {
                            expect(pp.writepost).toEqual
                            ('shyam')
                        })
            });
    })