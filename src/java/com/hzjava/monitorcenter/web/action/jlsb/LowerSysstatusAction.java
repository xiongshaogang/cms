package com.hzjava.monitorcenter.web.action.jlsb;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.struts.DispatchActionSupport;

import cn.collin.commons.domain.PageResult;
import cn.collin.commons.utils.DateUtils;

import com.hzjava.monitorcenter.constant.AppConstant;
import com.hzjava.monitorcenter.service.JlsbService;
import com.hzjava.monitorcenter.utils.StringUtils;

/**
 * 下级系统运行情况查询(sysstatus)
 * 
 * @author xiangqi.java@gmail.com
 * @struts.action type="org.springframework.web.struts.DelegatingActionProxy"
 *                scope="request" path="/lowerSysstatus" validate="false"
 *                parameter="m"
 * @struts.action-forward name="index"
 *                        path="/WEB-INF/pages/jlsb/lowerSysstatusJSON.jsp"
 */
public class LowerSysstatusAction extends DispatchActionSupport {
	private static Logger logger = Logger.getLogger(LowerSysstatusAction.class);
	private JlsbService jlsbService;

	public ActionForward index(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		int start = ServletRequestUtils.getIntParameter(request, "start", 0);
		int pageLength = ServletRequestUtils.getIntParameter(request, "limit",
				AppConstant.PAGERESULT_PAGE_LENGTH);
		int pageIndex = start / pageLength + 1;
		String startDateStr = ServletRequestUtils.getStringParameter(request,
				"startDate");
		String endDateStr = ServletRequestUtils.getStringParameter(request,
				"endDate");
		String idSystem = ServletRequestUtils.getStringParameter(request,
				"idSystem");

		Date startDate = StringUtils.isBlank(startDateStr) ? null : DateUtils
				.parse(startDateStr, "yyyy-MM-dd");
		Date endDate = StringUtils.isBlank(endDateStr) ? null : DateUtils
				.parse(endDateStr, "yyyy-MM-dd");

		PageResult ps = jlsbService.listLowerSysstatusByPage(pageIndex,
				pageLength, startDate, endDate, idSystem);

		request.setAttribute("ps", ps);

		return mapping.findForward("index");
	}

	public void setJlsbService(JlsbService jlsbService) {
		this.jlsbService = jlsbService;
	}

}
