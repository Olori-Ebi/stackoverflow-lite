import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('/GET Server', () => {
  it('should start server on port 4000', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET Questions', () => {
  it('should get all questions', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        res.body.should.be.a('array');
        res.should.have.status(200);
        res.body.length.should.be.eql(3);
        done();
      });
  });
});

describe('/GET/:id Questions', () => {
  it('should get a single question', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        res.body.should.be.a('array');
        res.should.have.status(200);
        res.body.length.should.be.eql(1);
        done();
      });
  });
});

describe('/POST Questions', () => {
  it('should post a question', (done) => {
    const Answers = {
      id: 4,
      title: 'Sherlock Holmes',
      body: 'Interestingly interesting',
    };
    chai.request(app)
      .post('/api/v1/questions')
      .send(Answers)
      .end((err, res) => {
        res.body.should.be.a('array');
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST Questions', () => {
  it('should not post a question', (done) => {
    const Answers = {
      id: 4,
      body: 'Interestingly interesting',
    };
    chai.request(app)
      .post('/api/v1/questions')
      .send(Answers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(400);
        res.body.should.have.property('msg');
        res.body.should.have.property('msg').eql('Please include an id, title and body');
        done();
      });
  });
});

describe('/POST Questions', () => {
  it('should not post a question', (done) => {
    const Answers = {
      id: 4,
      title: 'Interestingly interesting',
    };
    chai.request(app)
      .post('/api/v1/questions')
      .send(Answers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(400);
        res.body.should.have.property('msg');
        res.body.should.have.property('msg').eql('Please include an id, title and body');
        done();
      });
  });
});

describe('/POST Answers', () => {
  it('should not post an answer', (done) => {
    const Answers = {
      id: 5,
      title: 'Sherlock Holmes',
    };
    chai.request(app)
      .post('/api/v1/questions/5/answers')
      .send(Answers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(400);
        res.body.should.have.property('msg');
        res.body.should.have.property('msg').eql('no question with the id of 5');
        done();
      });
  });
});

describe('/POST Answers', () => {
  it('should post an answer', (done) => {
    const Answers = {
      id: 2,
      body: 'Sherlock Holmes',
    };
    chai.request(app)
      .post('/api/v1/questions/2/answers')
      .send(Answers)
      .end((err, res) => {
        res.body.should.be.a('array');
        res.should.have.status(200);
        done();
      });
  });
});
