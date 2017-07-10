jQuery(function () {
    loadPage();
});

/**
 * Load Page
 */
function loadPage()
{
    jQuery.ajax("./src/index.php?widgetId=" + widgetId + "&page=" + pageNumber, {
        success: function (htmlData) {
            jQuery("#serviceMonitoringTable").empty().append(htmlData);
            var hostMonitoringTable = jQuery("#serviceMonitoringTable").find("img, style, script, link").load(function () {
                var h = document.getElementById("serviceMonitoringTable").scrollHeight + 50;
                ResizeFrame(window.name, h);
            });
        }
    });
    if (autoRefresh) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(loadPage, (autoRefresh * 1000));
    }
}

/**
 * Load toolbar
 */
function loadToolBar()
{
    jQuery("#toolBar").load(
            "./src/toolbar.php",
            {
                widgetId: widgetId
            }
    );
}

jQuery(function () {
    loadToolBar();
    loadPage();
    $('.checkall').live('click', function () {
        var chck = this.checked;
        $(this).parents().find(':checkbox').each(function () {
            $(this).attr('checked', chck);
            clickedCb[$(this).attr('id')] = chck;
        });
    });
    $(".selection").live('click', function () {
        clickedCb[$(this).attr('id')] = this.checked;
    });
});

function ResizeFrame(ifrm, height) {
    if (height < 150) {
        height = 150;
    }
    jQuery(window.parent.document).find('[name="' + ifrm + '"]').height(height);
}
