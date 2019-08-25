describe("Trace Span Tags", function() {
  // var traces;
  
  beforeEach(function() {
    // traces = trace_details

    // set in spechelper
    this.traces = this.traces
  });

  it("should generate traces", function() {    
    this.traces.forEach( x => console.table(x))
    expect(this.traces.length).toBeTruthy();
  })

  it("should apply the global tag 'team' to every span", function() {
    // check if every span for every trace has the 'team' tag
    var all_spans_have_team_tag = this.traces.every( (trace) => trace.every( (span) => span.meta !== undefined && span.meta["team"] !== undefined ))
    expect(all_spans_have_team_tag).toBeTruthy();
  });

  it("should apply the value 'cake' to every global tag 'team' ", function() {
    // collect the value of every span's 'team' tag
    var result = this.traces.map( (trace) => trace.map( (span) => span.meta !== undefined ? span.meta["team"] : undefined ))
    
    // check that the value is cake for every 'team' tag
    all_team_tags_are_set_to_cake = result.every( (trace) => trace.every( (team) => team === 'cake'))
    expect(all_team_tags_are_set_to_cake).toBeTruthy()
  })
});
