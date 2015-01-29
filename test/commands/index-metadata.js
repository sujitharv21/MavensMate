'use strict';

var helper      = require('../test-helper');
var chai        = require('chai');
var should      = chai.should();

describe('mavensmate index-metadata', function(){

  var project;
  var testClient;

  before(function(done) {
    this.timeout(4000);
    testClient = helper.createClient('atom');
    helper.unlinkEditor();
    helper.putTestProjectInTestWorkspace(testClient, 'index-metadata');
    helper.setProject(testClient, 'index-metadata', function(err, proj) {
      project = proj;
      done();
    });
  });

  after(function(done) {
    helper.cleanUpTestProject('index-metadata')
      .then(function() {
        done();
      });
  });

  it('should index metadata based on the project subscription', function(done) {
    
    this.timeout(80000);

    testClient.executeCommand('index-metadata', function(err, response) {
      should.equal(err, null);
      response.should.have.property('result');
      response.result.should.equal('Metadata successfully indexed');
      done();
    });
  });

  it('should get metadata index from project', function(done) {
    
    this.timeout(10000);

    testClient.executeCommand('get-metadata-index', function(err, response) {
      should.equal(err, null);
      response.should.have.property('result');
      response.result.length.should.equal(project.getSubscription().length);
      done();
    });
  });

});
