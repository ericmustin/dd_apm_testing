// tshark -f 'tcp port 8126' -Y 'http.request.method == PUT' -i 'lo0' -T json > ./spec_output.json

const msgpack = require('msgpack-lite')
const codec = msgpack.createCodec({ int64: true })
var captured_packets = require("../../spec_output.json");

var trace_details = captured_packets.map(function(x) {
  var media_type = x._source.layers.media['media.type'].split(":").join("")
  
  // from https://jsfiddle.net/antlafarge/wrjzt1zy/
  var bytes = []

    for (var c = 0; c < media_type.length; c += 2) {
      bytes.push(parseInt(media_type.substr(c, 2), 16));
    }

  var decoded = msgpack.decode(new Uint8Array(bytes))

  return decoded[0]
})

describe("Trace Span Tags", function() {
  var traces;

  beforeEach(function() {
    traces = trace_details
  });

  it("should apply the global tag 'team' to every span", function() {
    // check if every span for every trace has the 'team' tag
    var all_spans_have_team_tag = traces.every( (trace) => trace.every( (span) => span.meta !== undefined && span.meta["team"] !== undefined ))
    expect(all_spans_have_team_tag).toBeTruthy();
  });

  it("should apply the value 'cake' to every global tag 'team' ", function() {
    // collect the value of every span's 'team' tag
    var result = traces.map( (trace) => trace.map( (span) => span.meta !== undefined ? span.meta["team"] : undefined ))
    
    // check that the value is cake for every 'team' tag
    all_team_tags_are_set_to_cake = result.every( (trace) => trace.every( (team) => team === 'cake'))
    expect(all_team_tags_are_set_to_cake).toBeTruthy()
  })
});
