var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var {File, FileWriter, XMLStreamWriter} = require('dw/io');

module.exports.execute = function () {
  var demoObjectIterator = CustomObjectMgr.getAllCustomObjects('DemoObject');
  var file = new File([File.IMPEX, 'test', 'text.xml']).join(File.SEPARATOR);
  var fileWriter = new FileWriter(file);
  
  var xsw = new XMLStreamWriter(fileWriter);

  xsw.writeStartDocument();
  xsw.writeStartElement('products');


  while (demoObjectIterator.hasNext()) {
    var demo = demoObjectIterator.next();
    xsw.writeStartElement('products');
    xsw.writeStartAttribute('products');
  }

  fileWriter.close();
}