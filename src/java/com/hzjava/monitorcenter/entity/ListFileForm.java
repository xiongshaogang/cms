package com.hzjava.monitorcenter.entity;/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.upload.FormFile;


public class ListFileForm extends ActionForm {

    /*
      * Generated Methods
      */
    private FormFile formFile1;
    private FormFile formFile2;

    public FormFile getFormFile1() {
        return formFile1;
    }

    public void setFormFile1(FormFile formFile1) {
        this.formFile1 = formFile1;
    }

    public FormFile getFormFile2() {
        return formFile2;
    }

    public void setFormFile2(FormFile formFile2) {
        this.formFile2 = formFile2;
    }

    /**
     * Method validate
     * @param mapping
     * @param request
     * @return ActionErrors
     */
    public ActionErrors validate(ActionMapping mapping,
                                 HttpServletRequest request) {
        // TODO Auto-generated method stub
        return null;
    }

    /**
     * Method reset
     * @param mapping
     * @param request
     */
    public void reset(ActionMapping mapping, HttpServletRequest request) {
        // TODO Auto-generated method stub
    }


}