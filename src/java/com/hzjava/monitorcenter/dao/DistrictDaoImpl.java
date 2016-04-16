package com.hzjava.monitorcenter.dao;

import java.util.List;

import cn.collin.commons.dao.MyDaoSupport;

import com.hzjava.monitorcenter.domain.District;

public class DistrictDaoImpl extends MyDaoSupport implements DistrictDao {

	@Override
	public void setEntityClass() {
		this.entityClass=District.class;
	}

	@Override
	public List<District> findChildByParent(Long parentId) {
		Long nextId=parentId+10000;
		String hql="from District where id>="+parentId+" and id<"+nextId;
		List<District> list=super.getHibernateTemplate().find(hql);
		return list;
	}
	
	public List<District> findChildFirst() {
		String hql="from District where id=010101";
		List<District> list=super.getHibernateTemplate().find(hql);
		return list;
	}
	

	@Override
	public List<District> getAllParents() {
		String hql="from District where mod(id,10000)=0";
		List<District> list=super.getHibernateTemplate().find(hql);
		return list;
	}

	@Override
	public District findById(Long id) {
		String hql="from District where id = "+id;
		List<District> list= super.getHibernateTemplate().find(hql);
		return list.get(0);
	}

}
