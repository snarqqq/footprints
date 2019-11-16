module ApplicationHelper
  def user_icon(user, options={})
    if user.avatar?
      image_tag user.avatar_url, options
    elsif user.image?
      image_tag user.image, options
    else
      options[:class] = options[:class] + " fa-2x"
      fa_icon "user-circle", options
    end
  end
end
