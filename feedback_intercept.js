$(document).ready(function() {
    $(".toolTipCom").on("click", function() {
        var C = $(this).offset().left + 15;
        var F = $(this).offset().top;
        var E = $(this).attr("rel");
        $("#helpValue").html(E);
        var B = $(this).outerWidth();
        var D = C + B;
        $(".fieldHelpCont").show();
        $(".fieldHelp .fieldHelpCont").css("left", D);
        $(".fieldHelp .fieldHelpCont").css("top", F)
    });
    $("html").click(function(B) {
        if ($(B.target).is(".toolTipCom")) {} else {}
    });
    try {
        $(".popUpContainer").center()
    } catch (A) {}
    $(".iconClose a").click(function() {
        $("#popContainer").hide();
        $(".overGray").hide();
        $(".NSRoverGray").hide();
        $(".overGrayAlert").hide();
        $("#showMe", window.parent.document).hide();
        $("#postReq", window.parent.document).css("z-index", "9991")
    });
    $("a.linkUnsc").click(function() {
        $("#popContainer").show();
        $("#popContainer .uns").show();
        $(".overGrayAlert").fadeIn()
    })
});

function customCheckBox(B) {
    var A = $(B).attr("checked");
    $(B).each(function() {
        $(this).animate({
            opacity: 0
        }, 0);
        A = $(this).attr("checked");
        if ($(this).is(":checked")) {
            $(this).parent().addClass("checked")
        } else {
            $(this).parent().removeClass("checked")
        }
    });
    var C = $(B).attr("disabled");
    $(B).each(function() {
        $(this).animate({
            opacity: 0
        }, 0);
        A = $(this).attr("disabled");
        if ($(this).is(":disabled")) {
            $(this).parent().addClass("disabled")
        } else {
            $(this).parent().removeClass("disabled")
        }
    })
}

function customRadioButton(B, C) {
    var A = $(B).attr("checked");
    $(B).each(function() {
        $(this).animate({
            opacity: 0
        }, 0);
        A = $(this).attr("checked");
        if ($(this).is(":checked")) {
            $("input[name=" + C + "]").parent().removeClass("checked");
            $("input[name=" + C + "]").attr("checked", "");
            $(this).attr("checked", "checked");
            $(this).parent().addClass("checked")
        }
    });
    var D = $(B).attr("disabled");
    $(B).each(function() {
        $(this).animate({
            opacity: 0
        }, 0);
        A = $(this).attr("disabled");
        if ($(this).is(":disabled")) {
            $("input[name=" + C + "]").parent().removeClass("disabled");
            $("input[name=" + C + "]").attr("disabled", "");
            $(this).attr("disabled", "disabled");
            $(this).parent().addClass("disabled")
        }
    })
}
customRadioButton($("input[name=proFor]"));
customRadioButton($("input[name=uType]"));
customRadioButton($("input[name=demo]"));
customRadioButton($("input[name=af]"));
customCheckBox($("input[name=uc]"));
customCheckBox($("input[name=rtm]"));
customCheckBox($("input[name=afProperty]"));
customCheckBox($("input[name=afProjects]"));
customCheckBox($("input[name=afAgents]"));
customCheckBox($("input[name=iWish]"));

function getISDVal(B, C) {
    var A = B.options[B.selectedIndex].text;
    $(C).val(A)
}
$.fn.center = function() {
    this.css("position", "fixed");
    this.css("z-index", "10001");
    this.css("top", ($(window).height() - this.height()) / 2 + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + "px");
    return this
};

function verifyMobileReq(C) {
    var B = $("#mobileid").val();
    var A = $("#inputnumber").val();
    ajaxService.verifyMobileReqForm(B, A, C, {
        callback: function(D) {
            if (D != null && D != "") {
                $("#smsVerifiedMes").hide();
                if (D.scussed == "N") {
                    $("#smsVerifiedMes").show()
                }
                if (D.scussed == "Y") {
                    $("#formdiveid").hide();
                    $("#popContainer").hide();
                    $(".overGray").hide();
                    $(".NSRoverGray").hide();
                    postReq()
                }
            } else {
                $("#smsVerifiedMes").show()
            }
        },
        async: false
    })
}
jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this
};
var TrakMap = {};
TrakMap["1"] = "Buy";
TrakMap["2"] = "Buy_Residential_Under_Construction_Flats";
TrakMap["3"] = "Buy_Residential_Ready_to_Move_Flats";
TrakMap["4"] = "Buy_Residential_House/Villa";
TrakMap["5"] = "Buy_Residential_Plots";
TrakMap["6"] = "Buy_Residential_Owner_Properties ";
TrakMap["7"] = "Commercial";
TrakMap["8"] = "Buy_Commercial_OfficeSpace";
TrakMap["9"] = "Buy_Commercial_Pre_leased_Property";
TrakMap["10"] = "Buy_Commercial_Commercial_Shops";
TrakMap["11"] = "MB_Specials";
TrakMap["12"] = "Buy_MB_Specials_New_Projects";
TrakMap["13"] = "Buy_MB_Specials_Luxury_Homes";
TrakMap["14"] = "Buy_MB_Specials_Investment_Hotspots";
TrakMap["15"] = "Buy_MB_Specials_Deals_Auctions";
TrakMap["16"] = "Buy_Buying_Resources_Home_Buying_Guide";
TrakMap["17"] = "Buy_Buying_Resources_Post_your_Requirement";
TrakMap["18"] = "Buy_Buying_Resources_Home_Loan";
TrakMap["19"] = "Buy_Buying_Resources_Assisted_Search";
TrakMap["20"] = "Buy_Buying_Resources_Get_Advice_On_Call";
TrakMap["21"] = "Rent";
TrakMap["22"] = "Rent_Residential_Flats";
TrakMap["23"] = "Rent_Residential_House/Villa";
TrakMap["24"] = "Rent_Residential_PG";
TrakMap["25"] = "Rent_Residential_Owner_Properties";
TrakMap["26"] = "Rent_Commercial_Office_Space";
TrakMap["27"] = "Rent_Commercial_Commercial Shops ";
TrakMap["28"] = "Rental_Assistance";
TrakMap["29"] = "Rent_Rental_Assistance_Ask_On_Forum";
TrakMap["30"] = "Rent_Rental_Assistance_Post_your_Requirement";
TrakMap["31"] = "Rent_Rental_Assistance_Rent_Near_Workplace";
TrakMap["32"] = "Rent_Rental_Assistance_Find_An_Agent";
TrakMap["33"] = "Sell";
TrakMap["34"] = "Sell_Selling_Tools_Post_your_Property_Free";
TrakMap["35"] = "Sell_Selling_Tools_Propworth_Calculator";
TrakMap["36"] = "Sell_Selling_Tools_Find_An_Agent";
TrakMap["37"] = "Sell_Our_Services_Advertising_Packages_for_Sale";
TrakMap["38"] = "Sell_Our_Services_Advertising_Packages_for_Rent";
TrakMap["39"] = "Sell_Our_Services_Assisted_Selling";
TrakMap["40"] = "Sell_Our_Services_Value_Added_Services";
TrakMap["41"] = "Sell_Our_Services_Customer_Support";
TrakMap["42"] = "Advice";
TrakMap["43"] = "Advice_Resource_Centre_Detailed_Project_Reports";
TrakMap["44"] = "Advice_Resource_Centre_Housing_Sentiment_Index";
TrakMap["45"] = "Advice_Resource_Centre_Home_Buying_Guide";
TrakMap["46"] = "Advice_Resource_Centre_Prop_Index";
TrakMap["47"] = "Advice_Resource_Centre_Explore_Localities";
TrakMap["48"] = "Advice_Tools_Rates_And_Trends";
TrakMap["49"] = "Advice_Tools_EMI_Calculator";
TrakMap["50"] = "Advice_Tools_Affordability_Calculator";
TrakMap["51"] = "Advice_Tools_Propworth_Calculator";
TrakMap["52"] = "Advice_Tools_Smart_Search";
TrakMap["53"] = "Advice_Tools_Investment_Insights";
TrakMap["54"] = "Advice_Insights_Corner";
TrakMap["55"] = "Advice_Insights_Corner_Real_Estate_Forum";
TrakMap["56"] = "Advice_Insights_Corner_Property_News";
TrakMap["57"] = "Advice_Insights_Corner_Industry_Buzz";
TrakMap["58"] = "Advice_Advice_Ask_An_Expert";
TrakMap["59"] = "Advice_Advice_Ask_On_Forum";
TrakMap["60"] = "Advice_Advice_Financial_And_Legal_Advice";
TrakMap["61"] = "Advice_Advice_Get_Advice_On_Call";
TrakMap["62"] = "MB_Specials";
TrakMap["63"] = "MB_Specials_Luxury_Homes";
TrakMap["64"] = "MB_Specials_Investment_Hotspots";
TrakMap["65"] = "MB_Specials_Deals";
TrakMap["66"] = "MB_Specials_Auctions";
TrakMap["67"] = "MB_Specials_New_Projects";
TrakMap["68"] = "Login";
TrakMap["69"] = "AfterLogin";
TrakMap["70"] = "AfterLogin_View_Response";
TrakMap["71"] = "AfterLogin_Manage_Properties";
TrakMap["72"] = "AfterLogin_ Manage_Alerts";
TrakMap["73"] = "AfterLogin_Manage_Subscriptions";
TrakMap["74"] = "AfterLogin_Manage_Profile";
TrakMap["75"] = "AfterLogin_Sign_Out";
TrakMap["76"] = "Post_Property_Free";
TrakMap["77"] = "Get_Our_App_via_SMS";
TrakMap["78"] = "More";
TrakMap["79"] = "More_Property_Alert";
TrakMap["80"] = "More_Home_Loan";
TrakMap["81"] = "More_Magicbricks_Localities";
TrakMap["82"] = "More_Property_News";
TrakMap["83"] = "More_Luxury_Homes";
TrakMap["84"] = "More_Blog";
TrakMap["85"] = "More_Advertise_With_Us";
TrakMap["86"] = "More_Customer_Care";
TrakMap["87"] = "Buy_MB_Specials_Auctions";
TrakMap["88"] = "Rent_Residential";
TrakMap["89"] = "Rent_Commercial";
TrakMap["90"] = "Rent_Rental_Assistance";
TrakMap["91"] = "Sell_Selling_Tools";
TrakMap["92"] = "Sell_Our_Services";
TrakMap["93"] = "Advice_Resource_Centre";
TrakMap["94"] = "Advice_Tool";
TrakMap["95"] = "Advice_Advice";
TrakMap["96"] = "Buy_Residential";
TrakMap["97"] = "Ciick_Buy";
TrakMap["98"] = "Ciick_Rent";
TrakMap["99"] = "Ciick_Sell";
TrakMap["100"] = "Ciick_Advice";
TrakMap["101"] = "Ciick_MB_Specials";
TrakMap["102"] = "AfterLogin_MyChat";

function trackGaEventInGLobalNav(B) {
    if (TrakMap.hasOwnProperty(B) == true) {
        var A = TrakMap[B];
        if (_gaq) {
            if (typeof pageNameValue != "undefined" && pageNameValue != null && pageNameValue != "") {
                A = pageNameValue + "_" + A
            } else {
                A = "Other_" + A
            }
            _gaq.push(["_trackEvent", A, "Gloval Navigation"]);
            console.log("trackValue= " + A)
        }
    }
}

function trackGaEventInGLobalNavSeoCheck(C, D, B, A, E) {
    if (_gaq) {
        _gaq.push(["_trackEvent", C + "_" + D + "_" + A, "Gloval Navigation"]);
        window.open(B, "_self")
    }
}

function openFeedBackForm(A) {
    $(A).addClass("active");
    $("#selectedFeedback").val("");
    setTimeout(function() {
        $(".srpFeedback").addClass("srp_f_open")
    }, 150)


}

function closeFeedBackForm() {
    $(".srpFeedback").removeClass("srp_f_open");
    setTimeout(function() {
        $(".btnFeedback").removeClass("active");
        $(".f_checkBox").removeClass("checked");
        $(".f_s_icon").removeClass("selected");
        $("#f_bigIcon").removeAttr("class");
        $("#f_bigIcon").addClass("f_bigIcon f_defaultIcon");
        $(".f_formSection").removeClass("scrollForm")
    }, 250)
}

function submitFeedback(E) {
    try {
        var H = true;
        var I = $("#selectedFeedback").val();
        if (I != null && I.length > 0) {
            var C = "";
            var A = "";
            var B = getUserLoginId();
            if (!E) {
                A = $("#feedbackText").val();
                if (A.length < 1) {
                    H = false;
                    $("#feedbackTextError").show();
                    $("#feedbackTextError").find("p").text("Please enter your Feedback")
                }
                C = $("#feedbackEmail").val();
                if (B.length < 1 && C.length < 1) {
                    H = false;
                    $("#feedbackEmailError").show();
                    $("#feedbackEmailError").find("p").text("Please enter your Email")
                } else {
                    if (B.length < 1 && !validateEmailId(C)) {
                        H = false;
                        $("#feedbackEmailError").show();
                        $("#feedbackEmailError").find("p").text("Invalid email")
                    }
                }
            }
            
            if (H) {
                var G = window.location.href + "";
                G = G.replace(/&/g, "#");
                var D = "feedbackPoints=" + I + "&feedbackText=" + A + "&emailId=" + C + "&url=" + G;
                $.ajax({
                    url: contextPath + "ajax/submitWebsiteFeedback.json",
                    type: "post",
                    data: D,
                    success: function(J) {
                        closeFeedBackForm()
                    }
                })
            }
            setTimeout(function() {
                $("#feedbackTextError").hide();
                $("#feedbackEmailError").hide()
            }, 3000)
        } else {
            closeFeedBackForm()
        }
    } catch (F) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("feedbackTracking", "submitFeedback", F)
        }
    }
}

function validateEmailId(A) {
    var B = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return B.test(A)
}

function feedbackSelect(C, B, D) {
    $(".f_checkBox").removeClass("checked");
    $(".f_s_icon").removeClass("selected");
    $(C).find(".f_checkBox").addClass("checked");
    $(C).find(".f_s_icon").addClass("selected");
    $("#f_bigIcon").removeAttr("class");
    $("#f_bigIcon").addClass(B);
    $("#feedbackText").attr("placeholder", "Want to share more? Please do!");
    $(".f_userFillForm").find(".f_heading").hide();
    if ("f_headingImprov" == D) {
        $("#selectedFeedback").val(1);
        $("#feedbackText").attr("placeholder", "Tell us how we can improve..")
    } else {
        if ("f_headingGood" == D) {
            $("#selectedFeedback").val(2)
        } else {
            if ("f_headingAwesome" == D) {
                $("#selectedFeedback").val(3)
            }
        }
    }
    var A = getUserLoginId();
    if (A != null && A.length > 1) {
        $("#feedbackEmail").hide()
    } else {
        $("#feedbackEmail").show()
    }
    $("#feedbackText").val("");
    $("#feedbackEmail").val("");
    $("#" + D).show();
    setTimeout(function() {
        $("#f_bigIcon").addClass("active")
    }, 250);
    setTimeout(function() {
        $(".f_formSection").addClass("scrollForm")
    }, 650) 
};