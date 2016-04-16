<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json"%>
<json:object>
	<json:property name="amount" value="${ps.allResultsAmount}" />
	<json:array var="item" name="results" items="${ps.results}">
		<json:object>
			<json:property name="id" value="${item.id}" />
			<fmt:formatDate var="logTime" value="${item.logTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
			<json:property name="logTime" value="${logTime}" />
			<json:property name="level" value="${item.level}" />
			<json:property name="auditModule" value="${item.auditModule}" />
			<json:property name="userName" value="${item.userName}" />
			<json:property name="auditInfo" value="${item.auditInfo}" />
		</json:object>
	</json:array>
</json:object>
