function formatExit(query, method){
    var result = ("This is vars in query");
    result += ("<br/>");
    for(var key in query){
        result += (key + " :: " + query[key] + "<br/");
    }
    result += ("<br/>");
    result += ("something by " + method);
    
    return result;
}

export.formatExit = formatExit;